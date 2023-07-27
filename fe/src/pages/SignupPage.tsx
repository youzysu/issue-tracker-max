import Button from "@components/common/Button";
import TextInput from "@components/common/TextInput";
import useInput from "@hooks/useInput";
import { Link } from "react-router-dom";
import { AuthForm } from "./LoginPage";

export default function SignupPage() {
  const { isValid: isValidUsername, ...username } = useInput({
    initialValue: "",
    maxLength: 16,
    minLength: 6,
  });
  const { isValid: isValidPassword, ...password } = useInput({
    initialValue: "",
    maxLength: 16,
    minLength: 6,
  });

  return (
    <>
      <AuthForm>
        <TextInput
          name="아이디"
          variant="tall"
          hasError={!isValidUsername}
          placeholder="아이디"
          helpText="아이디는 최소 6자리여야 해요!"
          {...username}
        />
        <TextInput
          name="비밀번호"
          variant="tall"
          hasError={!isValidPassword}
          placeholder="비밀번호"
          helpText="비밀번호는 최소 6자리여야 해요!"
          type="password"
          {...password}
        />
        <Button
          variant="container"
          size="L"
          className="login-btn"
          disabled={!isValidUsername || !isValidPassword}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            console.log("회원가입");
          }}>
          회원가입
        </Button>
      </AuthForm>
      <Link to="/auth">
        <Button variant="ghost" size="M" className="change-auth-btn">
          이미 계정이 있으신가요? 로그인
        </Button>
      </Link>
    </>
  );
}
