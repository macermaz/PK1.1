import React from 'react';
import { useAppContext } from '@/context/AppProvider';

const ClinicalHistory = () => {
    const { state } = useAppContext();
    
    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Historial Clínico</h2>
            <div className="space-y-4">
                {state.clinicalHistory.map((session, index) => (
                    <div key={index} className="border-b pb-3">
                        <p className="font-semibold">{new Date(session.date).toLocaleDateString()}</p>
                        <p><span className="text-gray-600">Diagnóstico:</span> {session.diagnosis}</p>
                        <p><span className="text-gray-600">Puntuación:</span> {session.score}</p>
                        <button 
                            onClick={() => viewSessionDetails(session.id)}
                            className="mt-2 text-blue-600 hover:underline"
                        >
                            Ver detalles completos
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};