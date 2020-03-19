import axios from 'axios';
import { Router } from 'express';
import {
 ADDRESS_ACCESS_LICENSE_NUMBER, ADDRESS_PASSWORD, ADDRESS_URL, ADDRESS_USERNAME,
} from '../config';
import { addressValidator } from '../validation';

const router = Router();

router.post('/', async (req, res) => {
    try {
        await addressValidator.validateAsync(req.body, { abortEarly: false });

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
        res.status(200).send(response.data);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
