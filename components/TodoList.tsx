
import { useTranslations } from 'next-intl';
interface Todo {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onEdit }) => {
  const t = useTranslations('my-todo');
  console.log(t)
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">{t('title')}</th>
            <th className="py-3 px-6 text-left">{t('description')}</th>
            <th className="py-3 px-6 text-left">{t('status')}</th>
            <th className="py-3 px-6 text-left">{t('actions')}</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {Array.isArray(todos) && todos.length > 0 ? (
            todos.map((todo) => (
              <tr key={todo._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{todo.title}</td>
                <td className="py-3 px-6">{todo.description}</td>
                <td className={`py-3 px-6 ${todo.status === 'pending' ? 'text-red-500' : 'text-green-500'}`}>{todo.status}</td>
                <td className="py-3 px-6 flex space-x-2">
                  <button
                    onClick={() => onEdit(todo)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    {t('edit')}
                  </button>
                  <button
                    onClick={() => onDelete(todo._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    {t('delete')}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-3 px-6 text-center">{t('notAvailable')}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;