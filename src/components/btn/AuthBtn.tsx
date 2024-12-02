import style from './AuthBtn.module.css';

type Props = {
  context: string;
  validation: boolean;
};
export default function AuthBtn({ context, validation }: Props) {
  return (
    <button
      className={`${style.container} ${style[validation ? 'complete' : '']}`}
    >
      {context}
    </button>
  );
}
