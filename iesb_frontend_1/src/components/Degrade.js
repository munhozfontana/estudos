import { LinearGradient } from 'expo';
import React from "react";
import colors from '../utils/utils';


const Degrade = (props) => (
    <LinearGradient colors={[colors.primaria, colors.secundaria ]}
        style={{ flex: 1 }}
        start={[0, 1]}
        end={[1, 0]}>
    </LinearGradient>
);



export default Degrade;