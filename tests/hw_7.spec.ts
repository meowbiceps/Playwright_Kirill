import axios from 'axios';
import { test, expect } from "@playwright/test"
import { MainPage } from '../poms/pages/MainPage';
import { GaragePage } from '../poms/pages/GaragePage';
import dotenv from 'dotenv';
dotenv.config();

const carBrandId = 1;
const carModelId = 1;
const mileage = 122;


async function loginAndGetCookies() {
    const loginResponse = await axios.post(
        'https://qauto.forstudy.space/api/auth/signin',
        {
            email: process.env.API_EMAIL,
            password: process.env.API_PASSWORD,
            remember: false
        },
        { withCredentials: true }
    );

    const cookies = loginResponse.headers['set-cookie'];
    return cookies.join('; ');
}

test.describe('test suit', () => {
    test('Create car with API', async ({ page }) => {
        const mainPage = new MainPage(page);
        const garagePage = new GaragePage(page);

        const cookies = await loginAndGetCookies();

        const response = await axios.post(
            'https://qauto.forstudy.space/api/cars',
            {
                carBrandId: 1,
                carModelId: 1,
                mileage: 123
            },
            {
                headers: { Cookie: cookies }
            }
        );

        const carId = response.data.data.id;

        expect(response.status).toBe(201);
        await mainPage.open();

        const responseDelete = await axios.delete(
            `https://qauto.forstudy.space/api/cars/${carId}`,
            {
                headers: {
                    Cookie: cookies
                }
            }
        );

        expect(responseDelete.status).toBe(200);
    });

    test('Bad request', async ({ page, request }) => {
           
            const mainPage = new MainPage(page);
            const garagePage = new GaragePage(page);
        
            const response = await request.post('https://qauto.forstudy.space/api/cars', {
                data: {
                    carBrandId: carBrandId,
                    carModelId: carModelId,
                },
            });
        
            const responseBody = await response.json();
            expect(response.status()).toBe(400);
        
            await mainPage.open();
            await garagePage.waitFore(5000)
        })
        
        test('Bad request 404', async ({ page, request }) => {
           
            const mainPage = new MainPage(page);
            const garagePage = new GaragePage(page);
        
            const carBrandId = 1;
            const carModelId = 1;
        
            const response = await request.post('https://qauto.forstudy.space/api/cblablabla', {
                data: {
                    carBrandId: carBrandId,
                    carModelId: carModelId,
                    mileage: mileage
                },
            });
        
            const responseBody = await response.json();
            console.log('Ответ сервера:', responseBody);
        
            expect(response.status()).toBe(404);
    
        })


test('Create car and GET by ID', async ({ page }) => {
    const mainPage = new MainPage(page);
    const garagePage = new GaragePage(page);

    const cookies = await loginAndGetCookies();

    const createResponse = await axios.post(
        'https://qauto.forstudy.space/api/cars',
        {
            carBrandId,
            carModelId,
            mileage
        },
        {
            headers: { Cookie: cookies }
        }
    );

    expect(createResponse.status).toBe(201);

    const carId = createResponse.data.data.id;

    await mainPage.open();

    const getResponse = await axios.get(
        `https://qauto.forstudy.space/api/cars/${carId}`,
        {
            headers: { Cookie: cookies }
        }
    );

    expect(getResponse.status).toBe(200);

    expect(getResponse.data).toEqual(
        expect.objectContaining({
            status: 'ok',
            data: expect.objectContaining({
                id: carId,
                carBrandId: carBrandId,
                carModelId: carModelId,
                mileage: mileage,
                brand: expect.any(String),
                model: expect.any(String),
                logo: expect.any(String)
            })
        })
    );
    const deleteResponse = await axios.delete(
        `https://qauto.forstudy.space/api/cars/${carId}`,
        {
            headers: { Cookie: cookies }
        }
    );

    expect(deleteResponse.status).toBe(200);
});
test('Create two cars and check list', async () => {
    const cookies = await loginAndGetCookies();

    await axios.post(
        'https://qauto.forstudy.space/api/cars',
        {
            carBrandId,
            carModelId,
            mileage: 100
        },
        { headers: { Cookie: cookies } }
    );

    await axios.post(
        'https://qauto.forstudy.space/api/cars',
        {
            carBrandId,
            carModelId,
            mileage: 200
        },
        { headers: { Cookie: cookies } }
    );

    const listResponse = await axios.get(
        'https://qauto.forstudy.space/api/cars',
        { headers: { Cookie: cookies } }
    );

    expect(listResponse.status).toBe(200);
    expect(listResponse.data.data.length).toBeGreaterThan(1);

   
});
});
