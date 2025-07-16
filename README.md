# Web Development Project 5 - Musicality - Data Dashboard

Submitted by: Temidayo Akinyemi

This web app is a data dashboard that provides an at-a-glance summary of information gathered from a public API, which is Spotify in this case. 
The dashboard view contains summary statistics (popularity ranking, number of followes, and genre) and a list view of the artists' top tracks that can be searched and filtered.

Time spent: 51 hours

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [x] **`useEffect` React hook and `async`/`await` are used** ( I also had to use `axios` to get the Spotify access token ).
- [x] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes at least three summary statistics about the data, such as:
    - The artists' popularity ranking out of 100
    - The artists' number of followers
    - The artists' genre and if they don't have a known genre, the dashboard lets the user know that
- [x] **A search bar allows the user to search for an item in the fetched data (artist name)**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar 
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGNjaGtodHk2MGMzYjVnYjBoOHY0c2I4bjNiZ2V4M3h5enRqZzhzeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gyzUP3vjm7zHEP31Ya/giphy.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with <a href='https://www.bing.com/search?q=licecap&cvid=90c75dac1b13474cb222b3d1f03d6cc7&gs_lcrp=EgRlZGdlKgYIABBFGDsyBggAEEUYOzIGCAEQABhAMgYIAhAAGEAyBggDEAAYQDIGCAQQABhAMggIBRDpBxj8VdIBCDI2ODhqMGo5qAIIsAIB&FORM=ANAB01&PC=U531'>LICEcap</a>  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app.
- One challenge was figuring out how to use/access the Spotify API. Since I was more familiar with already having API_KEYS given once signing up, it was confusing to try and use Spotify's since they had access tokens that you needed to acquire.
- It was also difficult figuring out how to use axios, which I used a helper for, but it was more efficient than fetch since I didn't have to configure everything manually.

## License

    Copyright 2025 Temidayo Akinyemi

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
