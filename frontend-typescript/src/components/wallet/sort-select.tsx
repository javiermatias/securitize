import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

interface Props {
    onSort: (sortBy: string) => void;
}

const SortSelect: React.FC<Props> = ({ onSort }) => {
    const [sortBy, setSortBy] = useState('no-sort');

    return (
        <Form className='mt-5'>
            <Form.Select value={sortBy} onChange={e => {
                setSortBy(e.target.value);
                onSort(e.target.value);
            }}>
                <option value="no-sort">No Sort</option>
                <option value="favorite">Favorite</option>

            </Form.Select>

        </Form>
    );
};

export default SortSelect;