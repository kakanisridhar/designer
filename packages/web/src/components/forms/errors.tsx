import React from 'react';
import { Alert, Text } from 'theme-ui';

interface FieldErrorProps {
  errors?: Record<string, { type: string }>;
  messages: Record<string, Record<string, string>>;
}

const FormErrors: React.FC<FieldErrorProps> = ({ messages, errors }) => {
  if (!Object.keys(errors).length) return null;

  return (
    <Alert variant="formError" mt={2}>
      {Object.keys(errors).map((key) => (
        <Text key={key}>{messages[key][errors[key].type]}</Text>
      ))}
    </Alert>
  );
};

export default FormErrors;
