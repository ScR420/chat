import styled from "styled-components";

export const LinkText = styled.span`
    color: ${({ theme }) => theme.buttonBackground};
    cursor: pointer;
    text-decoration: underline;

    &:hover {
        color: ${({ theme }) => theme.buttonHover};
    }
`;

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

export const Input = styled.input`
    width: 100%;
    max-width: 400px;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid ${({ theme }) => theme.inputBorder};
    border-radius: 5px;
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.inputText};

    @media (max-width: 768px) {
        max-width: 300px;
    }
`;

export const Button = styled.button`
    padding: 10px 20px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.buttonText};
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.buttonHover};
    }

    @media (max-width: 768px) {
        padding: 8px 16px;
    }
`;

export const ChatBox = styled.div`
    width: 100%;
    max-width: 600px;
    height: 400px;
    overflow-y: auto;
    border: 1px solid ${({ theme }) => theme.inputBorder};
    border-radius: 5px;
    padding: 10px;
    background-color: ${({ theme }) => theme.cardBackground};

    @media (max-width: 768px) {
        max-width: 100%;
        height: 300px;
    }
`;