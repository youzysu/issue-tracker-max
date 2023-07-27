import Button from "@components/common/Button";
import TextInput from "@components/common/TextInput";
import useInput from "@hooks/useInput";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function LoginPage() {
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
      <Button variant="outline" size="L" className="github-login-btn">
        GitHub 계정으로 로그인
      </Button>
      <span className="or">or</span>
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
            console.log("로그인");
          }}>
          아이디로 로그인
        </Button>
      </AuthForm>
      <Link to="/auth/signup">
        <Button variant="ghost" size="M" className="change-auth-btn">
          아직 계정이 없으신가요? 회원가입
        </Button>
      </Link>
    </>
  );
}

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;

  .login-btn {
    font: ${({ theme: { font } }) => font.availableMD20};
  }
`;
