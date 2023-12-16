import { CodeLine } from "@/types/code";
import { Line, Nested } from "@/components/editor/structure";

export const LineGroup = ({ lines }: { lines: CodeLine[] }) => {
  return (
    <>
      {lines.map((line, index) => (
        <>
          <Line key={index} data={line} />
          {line.children && (
            <Nested>
              <LineGroup lines={line.children} />
            </Nested>
          )}
        </>
      ))}
    </>
  );
}
export default LineGroup;