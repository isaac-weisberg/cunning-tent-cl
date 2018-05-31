import { DirWorker } from "./DirWorker";
import { Enrichment } from "cuntent-assembler/dist";
import { EditingSessionObjectView } from "../Views/EditingSessionView/EditingSessionView";
import { GenericPathView } from "../Views/Generic/GenericPathView";
import { EnrichmentView } from "../Views/EnrichmentViews/EnrichmentView";
import { EditingSession } from "./EditingSession";

export namespace Components {
    const enrichmentFileExtension = ".cuntent"

    export function createEnrichmentEditingSessionIn(folder: string): Promise<EditingSession<Enrichment>> {
        return DirWorker.createEditingSessionForObjectAt(folder, Enrichment, enrichmentFileExtension, EnrichmentView, GenericPathView)
    }
}
