interface User {
    id: number;
    username: string;
    loggedIn: boolean;
    lastSeenAt: Date;
    loggedOutAt?: Date;
}

let users: User[] = [];

app.get('/users/loggedin', (req: Request, res: Response) => {
    const loggedInUsers = users.filter(user => user.loggedIn);
    res.json({ count: loggedInUsers.length });
});

app.get('/users/active', (req: Request, res: Response) => {
    const activeUsers = users.filter(user => user.loggedIn && !user.loggedOutAt);
    if (activeUsers.length > 0) {
        const mostRecentActiveUser = activeUsers.reduce((prev, current) => {
            return (prev.lastSeenAt > current.lastSeenAt) ? prev : current;
        });
        res.json(mostRecentActiveUser);
    } else {
        res.status(404).send('No active users found.');
    }
});
