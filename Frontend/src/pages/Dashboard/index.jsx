import React, { useEffect } from 'react';
import { DefaultDashboard } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../config/redux/action';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/login");
        }
    }, [isError, navigate]);

    return (
        <DefaultDashboard />
    );
};

export default Dashboard;
