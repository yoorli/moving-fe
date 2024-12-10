import classNames from 'classnames';
import style from './Button.module.css';

/**
 * 형식: solid|outlined Width color
 * 예시: solid640pxBlue300
 * -
 * 주의) 314.5px 같은 소수점 부분은 소수점 밑을 다 버리고 314px로 활용해주세요!
 */

const BUTTON_STYLES = {
  solid116pxBlue300: 'solid116pxBlue300',
  solid340pxBlue300: 'solid340pxBlue300',
  solid640pxBlue300: 'solid640pxBlue300',
  solid560pxBlue300: 'solid560pxBlue300',
  solid196pxBlue300: 'solid196pxBlue300',
  solid354pxBlue300: 'solid354pxBlue300',
  solid314pxBlue300: 'solid314pxBlue300',
  solid180pxBlue300: 'solid180pxBlue300',
  solid660pxBlue300: 'solid660pxBlue300',
  outlined340pxBlue300: 'outlined340pxBlue300',
  outlined560pxBlue300: 'outlined560pxBlue300',
  outlined354pxLine200: 'outlined354pxLine200',
  outlined314pxLine200: 'outlined314pxLine200',
  outlined660pxBlue300: 'outlined660pxBlue300',
  // 기사님 only
  solid448pxBlue300: 'solid448pxBlue300',
  solid123pxBlue100: 'solid123pxBlue100',
  solid280pxBackground200: 'solid280pxBackground200',
  solid280pxBlue300: 'solid280pxBlue300',
  outlined448pxBlue300: 'outlined448pxBlue300',
} as const;

type ButtonStyle = keyof typeof BUTTON_STYLES;

interface ButtonProps {
  text?: string;
  btnStyle: ButtonStyle;
  src?: string;
  srcLocationFront?: boolean;
  alt?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  text,
  src,
  srcLocationFront,
  alt,
  btnStyle,
  className,
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  const buttonClass = classNames(className, {
    [style[btnStyle ?? '']]: btnStyle,
    [style['disabled']]: disabled,
  });
  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {src ? (
        <span className={style.buttonImg}>
          {srcLocationFront ? (
            <>
              <img src={src} alt={alt} /> {text}
            </>
          ) : (
            <>
              {text} <img src={src} alt={alt} />
            </>
          )}
        </span>
      ) : (
        text
      )}
    </button>
  );
}
