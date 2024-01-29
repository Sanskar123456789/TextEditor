function Button(props) {
  const { isBtnDisabled, btnLabel, btnAction } = props;
  return (
    <>
      <button
        className="btn-primary"
        disabled={isBtnDisabled}
        onClick={btnAction}
      >
        {btnLabel}
      </button>
    </>
  );
}

export default Button;
