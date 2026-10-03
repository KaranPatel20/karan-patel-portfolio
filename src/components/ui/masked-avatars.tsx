"use client"
// Adapted from Vengeance UI MaskedAvatars: icon links instead of photos, Organic tokens.
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface MaskedAvatar {
    name: string
    icon: React.ReactNode
    href: string
    onClick?: () => void
}

export interface MaskedAvatarsProps {
    avatars: MaskedAvatar[]
    size?: number // avatar size (responsive base)
    border?: number
    column?: number
    movement?: number // hover lift sensitivity
    transition?: number // animation duration
    ltr?: boolean
    ringed?: boolean
    offset?: number // text ring rotation offset
    blurOnRest?: boolean // NEW: only blur when not hovered
    className?: string
}

export function MaskedAvatars({
    avatars,
    size = 70,
    border = 8,
    column = 40,
    movement = 0.72,
    transition = 0.18,
    ringed = true,
    offset = -3,
    blurOnRest = true,
    className
}: MaskedAvatarsProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    // Optimize derived values with useMemo
    const { dynamicSize, maskImage } = React.useMemo(() => {
        const dynamicSize = `clamp(${size - 20}px, ${size}px, ${size + 30}px)`
        const circle = (border * 2 + size) / 2
        const radX = circle - column - border
        const maskImage = `radial-gradient(${circle}px ${circle}px at ${radX}px 50%, transparent ${circle - 0.5}px, white ${circle}px)`
        return { dynamicSize, maskImage }
    }, [size, border, column])

    const transitionConfig = React.useMemo(() => ({
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
    }), [])

    return (
        <div
            className={cn("relative flex items-center", className)}
            style={{
                gap: `min(6vw, ${size * 0.5}px)`,
                "--size": dynamicSize,
            } as React.CSSProperties}
            role="group"
            aria-label="Social links"
        >
            <div className="relative flex items-center">
                <ul
                    className="m-0 p-0 list-none grid grid-flow-col content-end"
                    style={{
                        height: column,
                        gridAutoColumns: column,
                        transform: `translateX(${(size - column) * 0.5}px)`,
                    }}
                    
                >
                    {avatars.map((person, index) => {
                        const isHovered = hoveredIndex === index
                        const isPrevHovered = hoveredIndex === index - 1

                        const baseOffset = -size * 1.5
                        const moveOffset = size * movement

                        const maskPosition = isPrevHovered
                            ? `0 ${baseOffset - moveOffset}px`
                            : isHovered
                                ? `0 ${baseOffset + moveOffset}px`
                                : `0 ${baseOffset}px`

                        return (
                            <motion.li
                                key={person.name}
                                className="relative grid content-end outline-none pointer-events-none will-change-transform"
                                                                style={{
                                    width: dynamicSize,
                                    aspectRatio: "1/3",
                                    transform: `translate(
                    ${(size - column) * -0.5}px,
                    ${(size - column) * 0.5}px
                  )`,
                                    zIndex: avatars.length - index,
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onFocus={() => setHoveredIndex(index)}
                                onBlur={() => setHoveredIndex(null)}
                                onTouchStart={() => setHoveredIndex(index)}
                            >
                                {ringed && (
                                    <div
                                        className="name absolute left-1/2 text-center uppercase font-mono text-xs font-medium text-accent pointer-events-none"
                                        aria-hidden="true"
                                        style={{
                                            width: size,
                                            height: size,
                                            borderRadius: "50%",
                                            bottom: 0,
                                            transform: `translate(-50%, ${isHovered ? -movement * 100 : 0
                                                }%)`,
                                            transition: `transform ${transition}s ease-out`,
                                        }}
                                    >
                                        {person.name.split("").map((char, i) => (
                                            <span
                                                key={i}
                                                className="absolute will-change-transform"
                                                style={{
                                                    offsetPath: "border-box",
                                                    offsetDistance: `${(offset + i) * 0.75}ch`,
                                                    offsetAnchor: "50% 130%",
                                                    transform: isHovered
                                                        ? "translate(0, 0)"
                                                        : "translate(0, 100%)",
                                                    filter: isHovered
                                                        ? "blur(0px)"
                                                        : blurOnRest
                                                            ? "blur(4px)"
                                                            : "blur(0px)",
                                                    opacity: isHovered ? 1 : 0,
                                                    transition: `transform ${transition}s ease-out, opacity ${transition}s ease-out, filter ${transition}s ease-out`,
                                                }}
                                            >
                                                {char}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="avatar-holder absolute inset-0 grid content-end">
                                    <motion.a
                                        href={person.href}
                                        target={person.href.startsWith("http") ? "_blank" : undefined}
                                        rel={person.href.startsWith("http") ? "noreferrer" : undefined}
                                        onClick={person.onClick}
                                        className={cn(
                                            "avatar flex w-full aspect-square items-center justify-center rounded-full relative overflow-hidden pointer-events-auto border-[3px] border-background bg-accent-soft text-accent text-2xl will-change-transform",
                                            "outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                        )}
                                        aria-label={person.name}
                                        style={{
                                            maskImage: index === 0 ? "none" : maskImage,
                                            WebkitMaskImage: index === 0 ? "none" : maskImage,
                                            paddingLeft: index === 0 ? 0 : size - column,
                                            maskSize: "100% 400%",
                                            WebkitMaskSize: "100% 400%",
                                            maskRepeat: "no-repeat",
                                        }}
                                        animate={{
                                            maskPosition: index === 0 ? "0 0" : maskPosition,
                                            y: isHovered ? -movement * 100 + "%" : "0%",
                                            scale: isHovered ? 1.05 : 1,
                                            opacity:
                                                hoveredIndex !== null && hoveredIndex !== index
                                                    ? 0.7
                                                    : 1,
                                        }}
                                        transition={transitionConfig}
                                    >
                                        {person.icon}
                                    </motion.a>
                                </div>

                                {/* Hover/Tap Hit Area */}
                                <div className="absolute bottom-0 w-full aspect-square pointer-events-auto" />
                            </motion.li>
                        )
                    })}
                </ul>


            </div>
        </div>
    )
}
