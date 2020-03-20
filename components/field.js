export default function Field(props) {
  return (
    <div style={{ padding: '10px 0px' }}>
      <label
        id={[props.name, 'label'].join('-')}
        htmlFor={[props.name, 'input'].join('-')}
      >
        {props.label}{' '}
        {props.required ? <span title="Required"></span> : undefined}
      </label>
      <br />
      <input
        autoComplete={props.autoComplete}
        id={[props.name, 'input'].join('-')}
        name={props.name}
        required={props.required}
        type={props.type}
      />
    </div>
  );
}
