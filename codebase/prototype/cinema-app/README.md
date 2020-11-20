# Cinema Booking Microservice Flow

1. User queries to look for all cinemas in a city.

2. Cinema microservice gets all the cinemas by city from the database. Each cinema will be premiering multiple movies. 

3. Movie details for each premier will be fetched from movie microservice.

4. User selects a cinema and movie, api fetches all the shows for the movie in a particular cinema.

5. User selects the show and decides to book the seats in a particular show of movie in a cinema.

6. Booking service invokes the cinema microservice to update the seats in cinema.

7. Booking service will invoke the payment microservice to get payment details from user and deduct amount.

8. Booking microservice will then send a notification to the user. Notification microservice invokes receipt microservice to generate user receipt.

9. Once receipt microservice return the receipt, notification is sent to the user by notification microservice.
