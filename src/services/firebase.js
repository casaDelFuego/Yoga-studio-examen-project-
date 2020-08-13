import moment from 'moment'

const config = {
    apiKey: "AIzaSyCuW5MneIzueNP2zUCP4R1lLKf-OjXkS_U",
    authDomain: "nheeling-7e3f8.firebaseapp.com",
    databaseURL: "https://nheeling-7e3f8.firebaseio.com",
    projectId: "nheeling-7e3f8",
    storageBucket: "nheeling-7e3f8.appspot.com",
    messagingSenderId: "969390156748",
    appId: "1:969390156748:web:50df4546cdaa742ffb4b69",
    measurementId: "G-5MP1Q5CXCZ"
};

class Firebase {
    constructor(app) {
        app.initializeApp(config);

        /* Helper */

        this.emailAuthProvider = app.auth.EmailAuthProvider;

        /* Firebase APIs */

        this.auth = app.auth();
        this.db = app.firestore();

        /* Social Sign In Method Provider */

        this.googleProvider = new app.auth.GoogleAuthProvider();

    }

    // *** Auth API ***


    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);

    doSignOut = () => this.auth.signOut();

    // *** Merge Auth and DB User API *** //

    onAuthUserListener = (next, fallback) => {
        return this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .get()
                    .then(snapshot => {
                        const dbUser = snapshot.data();
                        //console.log('this is dbUser', dbUser)

                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            ...dbUser,
                        };
                        //create a user reference to this class, kinda useful to bind it with "this"
                        //here because auth passed in the beginning of the lifecycle of this component

                        this._currentUser = authUser

                        next(authUser);
                    });
            } else {
                fallback();
            }
        })
    }
    // ***  API ***

    user = uid => this.db.collection(`users`).doc(uid);

    users = () => this.db.collection('users');

    lessons = () => this.db.collection('lessons');

    lesson = id => this.lessons().doc(id);

    booking = id => this.db.collection(`bookings`).doc(id);

    createBooking = (lesson, selectedWeek) => {
        //we need to count the exact date of the booking
        //via time, weekday and selected week 
        const time = lesson.time.split(':').map(i => parseInt(i))
        const date = moment()
            .week(selectedWeek)
            .weekday(lesson.weekday)
            .hour(time[0])
            .minutes(time[1])
            .seconds(0)
        return this.bookings().add({
            bookedAt: new Date(),
            lessonId: lesson.id,
            //state machine pattern(confirmed, cancelled) 
            status: "active",
            lessonDate: date.toDate(),
            userId: this.currentUser().uid,
            lessonTime: lesson.time,
            lessonName: lesson.name

        })
    }

    //finction where we need that ref from above
    currentUser = () => this._currentUser

    bookings = () => this.db.collection('bookings')

    changeBookingStatus = (booking, newStatus) => {
        return this.booking(booking.id).set({
            ...booking,
            status: newStatus
        })
    }




    getRefOfBookingsByUser = uid => {
        console.log('this is uid from get ref of bookings', uid)
        return this.bookings().where('userId', '==', uid)

    }

}

let firebase;

function getFirebase(app, auth, database) {
    if (!firebase) {
        firebase = new Firebase(app, auth, database);
    }

    return firebase;
}

export default getFirebase;





