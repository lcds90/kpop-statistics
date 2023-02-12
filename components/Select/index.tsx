import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 1.5rem;
  font-size: 16px;
  width: 100%;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);

`;

interface Props {
  disabled: boolean;
  value: string;
  handler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const OrderSelect: React.FC<Props> = ({ disabled, value, handler }) => {
  return (
    <StyledSelect disabled={disabled} onChange={handler} value={value}>
      <option value="ascDate">Por mais novo</option>
      <option value="descDate">Por mais antigo</option>
      <option value="asc">A - Z</option>
      <option value="desc">Z - A</option>
    </StyledSelect>
  );
};

export default OrderSelect;