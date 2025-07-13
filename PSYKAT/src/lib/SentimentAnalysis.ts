import * as natural from 'natural';
import { SentimentAnalyzer, PorterStemmer } from 'natural';

export class SentimentService {
    private analyzer: SentimentAnalyzer;
    
    constructor() {
        this.analyzer = new SentimentAnalyzer("Spanish", PorterStemmer, "afinn");
    }
    
    public analyze(text: string): number {
        const tokens = text.split(' ');
        return this.analyzer.getSentiment(tokens);
    }
    
    public getEmotion(score: number): string {
        if (score > 0.5) return '😊 Positivo';
        if (score > -0.5) return '😐 Neutral';
        return '😞 Negativo';
    }
}

// Uso en componentes:
/*
const sentiment = new SentimentService();
const score = sentiment.analyze("Me siento muy feliz hoy");
const emotion = sentiment.getEmotion(score);
*/