import React from "react";
import { useQuality } from "../../hooks/useQuality";
import PropTypes from "prop-types";
import Quality from "./qualities/quality";

const Qualities = ({ qualities }) => {
    const { isLoading, getQuality } = useQuality();

    const qualit = getQuality(qualities);
    if (!isLoading) {
        return (
            <>
                {qualit.map((qual) => (
                    <Quality key={qual._id} {...qual} />
                ))}
            </>
        );
    } else return "Loading...";
};
Qualities.propTypes = {
    qualities: PropTypes.array
};
export default Qualities;
