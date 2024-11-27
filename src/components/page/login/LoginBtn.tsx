import style from "./LoginBtn.module.css";

type Props = {
  context: string;
  validation: boolean;
};

export default function LoginBtn({ context, validation }: Props) {
  return (
    <button
      className={`${style.container} ${style[validation ? "complete" : ""]}`}
    >
      {context}
    </button>
  );
}
