import style from './SignupBtn.module.css';

type Props = {
  context: string;
  validation: boolean;
};

export default function SignupBtn({ context, validation }: Props) {
  return (
    <button
      className={`${style.container} ${style[validation ? 'complete' : '']}`}
    >
      {context}
    </button>
  );
}
