import axios from 'axios';
import { Router } from 'express';
import { ADDRESS_ACCESS_LICENSE_NUMBER, ADDRESS_PASSWORD, ADDRESS_URL, ADDRESS_USERNAME } from '../config';
import { catchAsync } from '../middleware';
import { addressValidator, validate } from '../validation';

const router = Router();

router.post('/', catchAsync(async (req, res) => {
    await validate(addressValidator, req.body, req, res);

    const configAddress = {
        headers: {
            AccessLicenseNumber: `${ADDRESS_ACCESS_LICENSE_NUMBER}`,
            Username: `${ADDRESS_USERNAME}`,
            Password: `${ADDRESS_PASSWORD}`,
        },
    };

    const {
        address, address2, city, state, zip,
    } = req.body;
    const data = {
        XAVRequest: {
            AddressKeyFormat: {
                AddressLine: [
                    address,
                    address2,
                ],
                PoliticalDivision2: city,
                PoliticalDivision1: state,
                PostcodePrimaryLow: zip,
                CountryCode: 'US',
            },
        },
    };
    const response = await axios.post(ADDRESS_URL, data, configAddress);
    res.status(200).json(response.data);
}));

export default router;
