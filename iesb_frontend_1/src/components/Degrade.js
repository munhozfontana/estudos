import { LinearGradient } from 'expo';
import React from "react";
import utils from '../utils/utils';


const Degrade = (props) => (
    <LinearGradient colors={[utils.colors.primaria, utils.colors.secundaria ]}
        style={{ flex: 1 }}
        start={[0, 1]}
        end={[1, 0]}>
    </LinearGradient>
);



export default Degrade;