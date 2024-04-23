import './InputWithLabel.css';
export default function InputWithLabel({ id, value, type = 'text', onInputChange, children }) {
    return (
        <div id='inputWithLabel'>
            <label htmlFor={id}>{children}</label>
            &nbsp;
            <input
                id={id}
                type={type}
                value={value}
                onChange={onInputChange}
            ></input>
        </div>
    );
}