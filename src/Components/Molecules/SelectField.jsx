import styled from "styled-components";
import SelectAtom from "../Atoms/Select";
import LabelAtom from "../Atoms/Label";

const SelectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 10px 0;
`;

const SelectField = ({ label, options }) => {
    return (
        <SelectWrapper>
        <LabelAtom text={label} fontSize="14px" />
        <SelectAtom options={options} />
        </SelectWrapper>
    );
};

export default SelectField;
