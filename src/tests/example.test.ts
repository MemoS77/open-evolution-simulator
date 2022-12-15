import EvolutionApp from "../code/evolution-app"

describe("Example tests", () => {
    it("should pass", () => {
        expect(true).toBe(true)
    })

    it("class test", () => {
        const app = new EvolutionApp()
        expect(app.forTest()).toBe(7)

    })

})