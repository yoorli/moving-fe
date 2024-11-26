import style from "./LoginBtn.module.css";

type Props = {
  context: string;
  onClick: () => void;
};

export default function LoginBtn({ context, onClick }: Props) {
  return (
    <div onClick={onClick} className={style.container}>
      {context}
    </div>
  );
}
