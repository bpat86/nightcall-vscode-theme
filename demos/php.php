<?php

declare(strict_types=1);

namespace App\Demo;

use Attribute;
use PDO;

#[Attribute(Attribute::TARGET_METHOD)]
final readonly class Route
{
    public function __construct(
        public string $path,
        public string $method = 'GET',
    ) {}
}

enum GreetingStyle: string
{
    case Casual = 'casual';
    case Formal = 'formal';
}

final readonly class GreetingRepository
{
    public function __construct(private PDO $pdo) {}

    #[Route('/greetings', method: 'POST')]
    public function greet(?string $name, GreetingStyle $style): string
    {
        $subject = $name ?: 'world';
        $greeting = match ($style) {
            GreetingStyle::Casual => "Hello, {$subject}!",
            GreetingStyle::Formal => "Good evening, {$subject}.",
        };

        $statement = $this->pdo->prepare(
            'INSERT INTO greetings (message) VALUES (:message)',
        );
        $statement->execute(['message' => $greeting]);

        return $greeting;
    }
}

$pdo = new PDO('sqlite::memory:');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->exec('CREATE TABLE greetings (message TEXT NOT NULL)');

$repository = new GreetingRepository($pdo);

echo $repository->greet(name: 'Ada', style: GreetingStyle::Formal);
