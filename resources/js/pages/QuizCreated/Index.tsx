import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quiz created',
        href: '/quiz-created',
    },
];

type User = {
    id: number;
    name: string;
    email: string;
};

type Question = {
    id: number;
    question_text: string;
    options: any[];
};

type Quiz = {
    id: number;
    name: string;
    thumbnail_url: string | null;
    user: User;
    questions: Question[];
};

type Props = {
    quizzes: Quiz[];
};

export default function Index() {
    const { props } = usePage<Props>();
    const quizzes: Quiz[] = props.quizzes || [];
    const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);
    const selectedQuiz = quizzes.find((q) => q.id === selectedQuizId) || null;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quiz Taken" />

            <div className="flex h-[calc(100vh-100px)] flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Info section – only takes needed height */}
                <div className="shrink-0">
                    <p>Quiz name : {selectedQuiz?.user?.name}</p>
                    <p>Number of questions : {selectedQuiz?.questions?.length ?? 0}</p>
                    <p>Participants : {/*selectedQuiz participant - Ignore this since the logic hasn't been implemented yet*/}</p>
                </div>

                {/* Scrollable box grid – takes remaining height */}
                <div className="flex-1 overflow-auto">
                    <div className="grid grid-cols-4 gap-4">
                        {quizzes.map((quiz) => (
                            <div
                                key={quiz.id}
                                onClick={() => setSelectedQuizId(quiz.id)}
                                className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-[2/1] cursor-pointer overflow-hidden rounded-xl border"
                                title={quiz.name}
                            >
                                <img
                                    src={quiz.thumbnail_url ?? 'placeholder-image.jpg'}
                                    alt={quiz.name}
                                    className="absolute inset-0 size-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
