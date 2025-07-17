import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: todos, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    const formattedTodos = todos.map((todo) => ({
      id: todo.id,
      text: todo.title,
      completed: todo.completed,
    }));

    return Response.json({ todos: formattedTodos });
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
