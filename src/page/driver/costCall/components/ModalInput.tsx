import classNames from 'classnames';
import style from './ModalInput.module.css';

interface ModalInputProps {
  text: string;
  basicText: string;
  isTextArea?: boolean;
}

export default function ModalInput({
  text,
  basicText,
  isTextArea,
}: ModalInputProps) {
  return (
    <div className={style.textInput}>
      {text}
      {isTextArea ? (
        <textarea
          className={classNames(style.input, { [style.textArea]: isTextArea })}
          placeholder={basicText}
        />
      ) : (
        <input className={style.input} type='text' placeholder={basicText} />
      )}
    </div>
  );
}
