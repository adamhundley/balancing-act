<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="/js/app.js"></script>
        <link rel="stylesheet" href="/css/app.css">

        <title>Messages</title>

        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
    </head>
    <body>
        <main>
            <div class="wrapper container-fluid">
                <h1 class="title">Messages</h1>
                <form class="message-form" action="#" method="">
                    @csrf
                    <div class="form-wrapper">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input id="name" type="text" name="name" placeholder="Name" class="name form-control">
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea rows="5" id="message" name="message" class="new-message form-control" placeholder="Message">
                            </textarea>
                        </div>
                        <button type="submit" class="submit-btn btn btn-default">
                            Submit Message
                        </button>
                    </div>
                    <br /><br />
                    <section class="messages-container">
                    </section>
                </form>
            </div>
        </main>
    </body>
</html>
