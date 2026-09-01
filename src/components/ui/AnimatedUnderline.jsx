import { useEffect, useRef, useState } from "react";

function AnimatedUnderline({
  as: Component = "div",
  children,
  className = "",
  color = "green",
  ...props
}) {
  const headingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = headingRef.current;

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const underlineClass =
    color === "red"
      ? "animated-underline--red"
      : "animated-underline--green";

  return (
    <Component
      ref={headingRef}
      className={`animated-underline ${underlineClass} ${
        isVisible ? "animated-underline--visible" : ""
      } ${className}`.trim()}
      {...props}
    >
      <span className="animated-underline__text">
        {children}
      </span>

      <span
        className="animated-underline__line"
        aria-hidden="true"
      />
    </Component>
  );
}

export default AnimatedUnderline;
