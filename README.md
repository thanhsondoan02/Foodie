# Foodie

![Foodie preview](https://firebasestorage.googleapis.com/v0/b/foodie-68790.appspot.com/o/Screenshot%202024-01-01%20082823.png?alt=media&token=0b2ce2e9-f709-4bb5-b0bc-b1c3040ee1a8)


Welcome to Foodie - an e-commerce website tailored for a pizzeria. This digital haven boasts an engaging menu replete with diverse choices ranging from pizzas and sushi to pasta. Streamlining the intricacies of online ordering stood as the paramount objective, ensuring a flawlessly smooth user expedition throughout this venture. Foodie is created utilizing technologies like React Icons, React Router DOM, React Alice Carousel, Leaflet Maps, React Paginate, UUID, React Lazy Load, and Framer Motion.

:fork_and_knife: Vibrant Culinary Center:
Imaginary eatery showcasing a comprehensive menu spanning pizzas, sushi, and pasta. Employed React components such as Icons, Router, and Carousel to facilitate seamless navigation and enhance the user interface.

:earth_asia: Geographical Insight Through Leaflet Maps:
Leveraged the Leaflet Maps API to enrich user interaction and foster a deeper comprehension of store locations through spatial awareness.

:pizza: Enhanced UI Flow through Pagination and Motion:
Utilized React Paginate to seamlessly divide menu pages, improving user-friendly navigation. Framer Motion introduced polished animations, elevating both visual allure and interactive engagement.

:electron: Streamlined Data Handling:
Utilizing UUID for unique ID generation guarantees robust identification of menu items and orders. Implementation of React Lazy Load optimizes the loading of images and components, significantly enhancing overall site performance.

:accessibility: Personalized User Interaction:
Facilitated user registration, login, and profile administration, allowing users to modify and delete profiles, thereby amplifying customization options.

:biohazard: Protected Communication with reCAPTCHA Integration:
Incorporated Google reCAPTCHA to authenticate users submitting contact forms, effectively mitigating spam and ensuring a secure communication environment.

At Foodie, the fusion of delectable cuisine and cutting-edge technology gives rise to a user-friendly digital encounter. This is the intersection of exceptional food and programming, allowing users to embark on a convenient and gratifying culinary journey.


## Instructions for hosting
This section is for hosting website in [https://int3306.freeddns.org/](https://int3306.freeddns.org/) only. We have cloned the repo, installed required packet and update config. So that we can go straight to the following steps.

First shut down all current terminals then open new terminal and expose port 8080.

```
/etc/jupyter/bin/expose 8080
```

From `root` folder to  `Foodie/server`:

```
cd Foodie/server
```

Now run the code and wait for success message `OKE ROI NHE PORT 8080`.

```
npm start
```

When you host successfully, open [Foodie Client](http://fall2324w20g2.int3306.freeddns.org) / [Foodie CMS](http://fall2324w20g2.int3306.freeddns.org/cms) / [Foodie Shipper](http://fall2324w20g2.int3306.freeddns.org/shipper). These following table show path for every screen in our Foodie app.

| Path | Screen |                                                          
|--------------|---------|
| `/` | Home |
| `/menu` | Menu |
| `/blog` | Blog |
| `/blog:blogId` | Blog Post |
| `/contact` | Contact |
| `/about` | About |
| `/register` | Register |
| `/cart` | Cart |
| `/profile` | Profile |
| `/careers` | Careers |
| `/refunds` | Refunds |
| `/terms` | Terms |
| `/privacy` | Privacy |
| `/history` | History |
| `/cms` | CMS Home |
| `/cms/contact` | CMS Contact |
| `/cms/mail` | CMS Mail |
| `/cms/order` | CMS Order |
| `/shipper` | Shipper Order |

## Instructions for local use

Before using, please clone this repo from Github.

```
git clone https://github.com/thanhsondoan02/Foodie.git
```

After that, install the requirements and run with npm.

```
# Run the client only
cd Foodie/client
npm install
npm start

# Run the server and client (build version)
cd Foodie/server
npm install
npm start
```

## Contribution

Foodie was created by the group 2 as a project for the Web Development course. Contributors include:
- Đoàn Thanh Sơn 20020153
- Bùi Đắc Hiên 20021346
- Phùng Sỹ Ngọc 19021342
- Trần Quốc Hưng 19021292
