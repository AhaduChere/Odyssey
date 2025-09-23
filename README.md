# Odyssey
A Basic calendar web app

## **Tech Stack**
[![NuxtJS](https://img.shields.io/badge/NuxtJS-00DC82?logo=nuxt&logoColor=white&style=for-the-badge)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge)](#)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff&style=for-the-badge)](#)


## **Pages**
**Auth**  
- Only accessible page if not logged in 
- Users can either log in or create an account from here 

**Home**  
- View upcoming and past deadlines
- Quickly mark them as complete  

**Calendar**  
- Visualize dates in month view
- Today's date is highlighted with a dark blue number.
- Deadlines shown as borders on days based on completion
  - Green: all deadlines on that day are complete
  - Red: at least one deadline on that day is incomplete
- Users can click on a day to
  - Add a deadline
  - Delete a deadline
  - Mark a deadline as complete or incomplete
- Users can also navigate to next and previous month via the buttons labeled "Next" and "Prev" at the top right and left of the calendar respectively    
  - when on a month that is not the current month users can click on the button on the bottom right labeled "Back to Present" to return to the current month 

**Archive**  
- View "DB" of deadlines  
- From here users can
  - Search for a deadline by name  
  - Filter deadlines by month  
  - Sort deadlines by
    - completion
    - deadline
    - creation date

**Account**  
- Manage user profile  
- From here users can edit their
  - Username
  - Email
- As well as view account stats    


