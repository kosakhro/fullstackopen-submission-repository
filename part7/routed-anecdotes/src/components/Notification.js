
const Notification = (props) => {

    const style = {
      border: "solid",
      padding: 10,
      borderWidth: 1,
    };
    return props.notification !== "" ? <div style={style}>{props.notification}</div> : <></>;
  };

  export default Notification