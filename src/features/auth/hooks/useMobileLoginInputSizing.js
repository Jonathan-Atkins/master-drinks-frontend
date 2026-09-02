import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";


const MOBILE_BREAKPOINT = 480;

const BASE_FONT_SIZE = 20;

const START_WIDTH_RATIO = 0.72;

const IDENTIFIER_EXTRA_WIDTH = 20;

const PASSWORD_EXTRA_WIDTH = 76;


function useMobileLoginInputSizing({
  identifier,
  password,
  showPassword,
}) {
  const formRef = useRef(null);

  const identifierInputRef =
    useRef(null);

  const [
    inputWidth,
    setInputWidth,
  ] = useState(null);

  const [
    fontSize,
    setFontSize,
  ] = useState(BASE_FONT_SIZE);


  useLayoutEffect(() => {
    const updateInputSizing = () => {
      if (
        window.innerWidth >
        MOBILE_BREAKPOINT
      ) {
        setInputWidth(null);

        setFontSize(
          BASE_FONT_SIZE
        );

        return;
      }

      const form =
        formRef.current;

      const identifierInput =
        identifierInputRef.current;

      if (
        !form ||
        !identifierInput
      ) {
        return;
      }

      const availableWidth =
        form.clientWidth;

      if (!availableWidth) {
        return;
      }

      const startingWidth =
        availableWidth *
        START_WIDTH_RATIO;

      const computedStyle =
        window.getComputedStyle(
          identifierInput
        );

      const canvas =
        document.createElement(
          "canvas"
        );

      const context =
        canvas.getContext("2d");

      if (!context) {
        return;
      }

      context.font = `
        ${computedStyle.fontWeight}
        ${BASE_FONT_SIZE}px
        ${computedStyle.fontFamily}
      `;

      const passwordDisplayText =
        showPassword
          ? password
          : "•".repeat(
              password.length
            );

      const identifierTextWidth =
        context.measureText(
          identifier
        ).width;

      const passwordTextWidth =
        context.measureText(
          passwordDisplayText
        ).width;

      const identifierWidth =
        identifierTextWidth +
        IDENTIFIER_EXTRA_WIDTH;

      const passwordWidth =
        passwordTextWidth +
        PASSWORD_EXTRA_WIDTH;

      const requiredWidth =
        Math.max(
          startingWidth,
          identifierWidth,
          passwordWidth
        );


      /*
       * Stage 1:
       * Expand both fields together.
       */
      if (
        requiredWidth <=
        availableWidth
      ) {
        setInputWidth(
          requiredWidth
        );

        setFontSize(
          BASE_FONT_SIZE
        );

        return;
      }


      /*
       * Stage 2:
       * Fields have reached their
       * maximum width.
       *
       * Shrink both fields using
       * the same font size.
       */

      const identifierTextSpace =
        Math.max(
          availableWidth -
            IDENTIFIER_EXTRA_WIDTH,
          1
        );

      const passwordTextSpace =
        Math.max(
          availableWidth -
            PASSWORD_EXTRA_WIDTH,
          1
        );

      const identifierFontLimit =
        identifierTextWidth > 0
          ? BASE_FONT_SIZE *
            (
              identifierTextSpace /
              identifierTextWidth
            )
          : BASE_FONT_SIZE;

      const passwordFontLimit =
        passwordTextWidth > 0
          ? BASE_FONT_SIZE *
            (
              passwordTextSpace /
              passwordTextWidth
            )
          : BASE_FONT_SIZE;

      const sharedFontSize =
        Math.min(
          BASE_FONT_SIZE,
          identifierFontLimit,
          passwordFontLimit
        );

      setInputWidth(
        availableWidth
      );

      setFontSize(
        sharedFontSize
      );
    };


    updateInputSizing();

    window.addEventListener(
      "resize",
      updateInputSizing
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateInputSizing
      );
    };
  }, [
    identifier,
    password,
    showPassword,
  ]);


  const inputStyles = {
    "--mobile-input-width":
      inputWidth
        ? `${inputWidth}px`
        : "72%",

    "--mobile-input-font-size":
      `${fontSize}px`,
  };


  return {
    formRef,
    identifierInputRef,
    inputStyles,
  };
}


export default useMobileLoginInputSizing;