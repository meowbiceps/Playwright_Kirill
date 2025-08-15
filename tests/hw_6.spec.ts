import { test, expect } from '@playwright/test'
import { MainPage } from '../poms/pages/MainPage';
import { GaragePage } from '../poms/pages/GaragePage';
import dotenv from 'dotenv';
dotenv.config();

const carBrandId = 1;
const carModelId = 1;
const mileage = 122;

test.describe('test suit', () => {
    test('Substitude respons body', async ({ page }) => {
        const mainPage = new MainPage(page);
        const garagePage = new GaragePage(page);
        const name = 'Kirill'
        const lastName = 'Plotnikov'
    
        await page.route('**/api/users/profile', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    status: "ok",
                    data: {
                        userId: 1,
                        photoFilename: "default-user.png",
                        name: name,
                        lastName: lastName
                    }
                })
    
            });
        });
    
        mainPage.open();
        await garagePage.clickUserProfile();
        await garagePage.profileContextHasText(name + ' ' + lastName);
    })
    
    test('Create car with response', async ({ page, request }) => {
        const mainPage = new MainPage(page);
        const garagePage = new GaragePage(page);
    
        const response = await request.post('https://qauto.forstudy.space/api/cars', {
            data: {
                carBrandId: carBrandId,
                carModelId: carModelId,
                mileage: mileage
            },
        });
    
        const body = await response.json();
        const carId = body.data.id;
    
        expect(response.status()).toBe(201);
        await mainPage.open();
        await garagePage.waitFore(5000);
    
        const respenseDelete = await request.delete(`https://qauto.forstudy.space/api/cars/${carId}`);
        const responseBody = await respenseDelete.json();
    
        expect(response.status()).toBe(201);
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
    
        await mainPage.open();
        await garagePage.waitFore(5000)
    })
}) 






