import { useRef, useState } from "react";

const EASE_MAP = {
    linear: "linear",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
};

function transitionToCss(t) {
    const duration = (t && t.duration) || 0.4;
    let ease = "cubic-bezier(0.22, 1, 0.36, 1)";
    if (t && t.ease) {
        if (Array.isArray(t.ease)) ease = `cubic-bezier(${t.ease.join(", ")})`;
        else if (EASE_MAP[t.ease]) ease = EASE_MAP[t.ease];
    } else if (t && t.type === "spring") {
        ease = "cubic-bezier(0.34, 1.56, 0.64, 1)";
    }
    return `transform ${duration}s ${ease}`;
}

export default function DirectionHover({
    title = "DIRECTION HOVER",
    textColor = "currentColor", 
    hoverColor = "#FF6B00",
    transition = { type: "tween", duration: 0.303, ease: "easeInOut" },
    style = {},
    className = "",
    lineBox = "0.91em", // Menggunakan satuan relatif em agar kompatibel dengan clamp() font size
    gap = 0.15 // Spasi antar stack dalam satuan em
}) {
    const ref = useRef(null);
    const [dir, setDir] = useState("none");

    const onEnter = (e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const y = e.clientY - rect.top;
        setDir(y < rect.height / 2 ? "top" : "bottom");
    };
    
    const onLeave = () => setDir("none");

    const step = `calc(${lineBox} + ${gap}em)`;

    const getYTransform = () => {
        if (dir === "none") return `translateY(calc(-1 * ${step}))`;
        if (dir === "top") return `translateY(0)`;
        return `translateY(calc(-2 * ${step}))`;
    };

    const labelStyle = {
        margin: 0,
        whiteSpace: "pre",
        lineHeight: lineBox,
        height: lineBox,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
    };

    return (
        <span
            ref={ref}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className={className}
            style={{
                ...style,
                position: "relative",
                display: "inline-block",
                overflow: "hidden",
                height: lineBox,
                cursor: "pointer",
                userSelect: "none",
            }}
        >
            <span
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: `${gap}em`,
                    transform: getYTransform(),
                    transition: transitionToCss(transition),
                    willChange: "transform"
                }}
            >
                <span style={{ ...labelStyle, color: hoverColor }}>{title}</span>
                <span style={{ ...labelStyle, color: textColor }}>{title}</span>
                <span style={{ ...labelStyle, color: hoverColor }}>{title}</span>
            </span>
        </span>
    );
}
