import {FC} from 'react';
import {useParams} from "react-router";

const PlantDetails: FC<{}> = ({}) => {
    const {id} = useParams()

    return (
        <>
            PlantDetails id:{id}
        </>
    );
};

export default PlantDetails;
