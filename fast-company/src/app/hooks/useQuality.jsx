import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import QualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export const useQuality = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        getQualitiesList();
    }, []);
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    function getQuality(elements) {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality of qualities) {
                if (elem === quality._id) {
                    qualitiesArray.push(quality);
                }
            }
        }

        return qualitiesArray;
    }

    async function getQualitiesList() {
        try {
            const { content } = await QualityService.get();
            setQualities(content);

            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    return (
        <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
            {children}
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
