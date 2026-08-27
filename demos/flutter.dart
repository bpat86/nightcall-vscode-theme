import 'package:flutter/material.dart';

void main() => runApp(const DemoApp());

class DemoApp extends StatelessWidget {
  const DemoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
        useMaterial3: true,
      ),
      home: const WordCarousel(),
    );
  }
}

class WordCarousel extends StatefulWidget {
  const WordCarousel({super.key});

  @override
  State<WordCarousel> createState() => _WordCarouselState();
}

class _WordCarouselState extends State<WordCarousel> {
  static const words = ['Flutter', 'is', 'great'];
  int index = 0;

  void showNextWord() => setState(() => index = (index + 1) % words.length);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Stateful widget'),
      ),
      body: Semantics(
        liveRegion: true,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(words[index], style: Theme.of(context).textTheme.displaySmall),
            const SizedBox(height: 16),
            FilledButton.icon(
              onPressed: showNextWord,
              icon: const Icon(Icons.refresh),
              label: const Text('Update'),
            ),
          ],
        ),
      ),
    );
  }
}
