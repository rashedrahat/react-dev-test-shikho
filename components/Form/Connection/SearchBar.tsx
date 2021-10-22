import {AutoComplete} from 'antd';
import {useState} from "react";

type Props = {
    listOf: string;
    data: any[];
    selectOne: (id: string) => void;
};

const mockVal = (str: string, repeat: number = 1) => ({
    value: str.repeat(repeat),
});

const SearchBar = ({listOf, data, selectOne}: Props) => {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState<{ value: string }[]>([]);

    const onSearch = (searchText: string) => {
        setOptions(
            !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
        );
    };

    const onSelect = (data: string) => {
        console.log('onSelect', data);
    };

    const onChange = (data: string) => {
        setValue(data);
    };

    return (
        <>
            <AutoComplete
                options={options}
                style={{ width: "100%" }}
                onSelect={onSelect}
                onSearch={onSearch}
                placeholder=""
            />
        </>
    )
}

export default SearchBar;