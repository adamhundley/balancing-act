<?php

namespace Tests\Unit;

use App\Message;
use Tests\TestCase;

// use Illuminate\Foundation\Testing\WithFaker;
// use Illuminate\Foundation\Testing\RefreshDatabase;

class MessageTest extends TestCase
{
    protected $message;
    protected $message_string;
    protected $name;

    protected function setUp(): void
    {
        parent::setUp();
        $this->name = "Mr. Bob";
        $this->message_string = "Hey! I'm a message!";
        $data = [
            'message' => $this->message_string,
            'name' => $this->name,
        ];
        $this->message = new Message($data);
    }

    /** @test */
    public function testMessageHasAMessage()
    {
        $this->assertEquals($this->message->message, $this->message_string);
    }

    /** @test */
    public function testMessageHasAName()
    {
        $this->assertEquals($this->message->name, $this->name);
    }

    /** @test */
    public function testMessageWithNoMessage()
    {
        $data = [
            'name' => $this->name,
        ];

        $message = new Message($data);
        $this->assertEquals($message->message, '');
    }

    /** @test */
    public function testMessageWithNoName()
    {
        $data = [
            'message' => $this->message,
        ];

        $message = new Message($data);
        $this->assertEquals($message->name, '');
    }

    /** @test */
    public function testMessageWithNoDate()
    {
        $data = [];

        $message = new Message($data);
        $this->assertEquals($message->name, '');
        $this->assertEquals($message->message, '');
    }
}
