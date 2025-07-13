import { calcRawScore, letterGrade, SessionStats } from '../lib/ScoreEngine';

interface Props { stats: SessionStats }

export const ScoreCard = ({ stats }: Props) => {
  const raw   = calcRawScore(stats);
  const grade = letterGrade(raw);

  return (
    <div className="bg-white rounded-lg shadow p-6 text-center space-y-2">
      <p className="text-4xl font-black">{grade}</p>
      <p className="text-sm text-gray-500">{raw}/100</p>

      <hr className="my-2"/>

      <p className="text-sm">
        Preguntas brillantes: {stats.colours.purple} ·
        Azules: {stats.colours.blue} ·
        Verdes: {stats.colours.green}
      </p>
      {/* añade más detalles si quieres */}
    </div>
  );
};
