import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import Axios from "axios";

export default function Signup() {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [formsDisabled, setFormDisabled] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    Axios.post("http://localhost:8000/accounts/signup/", inputs)
      .then((response) => {
        console.log("response");
      })
      .catch((error) => {
        if (error.response) {
          setErrors({
            username: (error.response.data.username || []).join(""),
            password: (error.response.data.password || []).join(""),
          });
        }
      });
    console.log(inputs);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="username" onChange={onChange} />
        {errors.username && <Alert type="error" message={errors.username} />}
        <input type="password" name="password" onChange={onChange} />
        {errors.passsword && <Alert type="error" message={errors.passsword} />}
        <input type="submit" value="회원가입" disabled={formsDisabled} />
      </form>
    </div>
  );
}
