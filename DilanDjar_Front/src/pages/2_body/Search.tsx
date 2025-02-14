import React, {useState} from 'react';
import {get} from '../../api/api';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PlantItem from '../../components/PlantItem';
import {PlantType} from '../../@types/PlantType';
import Page from '../../components/layout/Page';

const Search: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<PlantType[]>([]);

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);

        if (term.length > 2) {
            try {
                const results = await get(`http://localhost:8080/products/search?name=${term}`);
                setSearchResults(results);
            } catch (error) {
                console.error('Erreur lors de la recherche des produits', error);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    };

    return (
        <Page>
            <Box sx={{textAlign: 'center', padding: '20px'}}>
                <TextField
                    label="Rechercher un produit"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{marginBottom: '20px'}}
                />
                <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                    {searchResults && searchResults.length > 0 ? (
                        searchResults.map((plant) => (
                            <PlantItem key={plant.id} plant={plant}/>
                        ))
                    ) : (
                        <p> Aucun résultat</p>
                    )}
                </Box>
            </Box>
        </Page>
    );
};

export default Search;
